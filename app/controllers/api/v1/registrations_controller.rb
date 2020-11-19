class Api::V1::RegistrationsController < Devise::RegistrationsController
  respond_to :html, :json

  def create
    respond_to do |format|
      format.html { super }
      format.json {
        build_resource(sign_up_params)


        if User.find_by_email(resource.email)
          return render json: {message: "email déjà utilisé"}, :status => 409
        end

        resource.save
        yield resource if block_given?
        if resource.persisted?
          if resource.active_for_authentication?
            sign_up(resource_name, resource)
            render json: { message: "compte n'a pas pu etre creer" },:status => 201
          else
            #in case confirmation needed
            # set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
            # expire_data_after_sign_in!
            # respond_with resource, location: after_inactive_sign_up_path_for(resource)
          end
        else
          clean_up_passwords resource
          set_minimum_password_length
          render json: { message: "compte n'a pas pu etre creer" }, :status => 400
        end
      }
    end
  end
end
