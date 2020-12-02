# frozen_string_literal: true

class Ability
  include CanCan::Ability


    # Define abilities for the passed in user here. For example:
    #
    #   user ||= User.new # guest user (not logged in)
    #   if user.admin?
    #     can :manage, :all
    #   else
    #     can :read, :all
    #   end
    #
    # The first argument to `can` is the action you are giving the user
    # permission to do.
    # If you pass :manage it will apply to every action. Other common actions
    # here are :read, :create, :update and :destroy.
    #
    # The second argument is the resource the user can perform the action on.
    # If you pass :all it will apply to every resource. Otherwise pass a Ruby
    # class of the resource.
    #
    # The third argument is an optional hash of conditions to further filter the
    # objects.
    # For example, here the user can only update published articles.
    #
    #   can :update, Article, :published => true
    #
    # See the wiki for details:
    # https://github.com/CanCanCommunity/cancancan/wiki/Defining-Abilities

    # can :read, [Restaurant, Offer]
    # return unless user.present?

  def initialize(user, controller_namespace)
    case controller_namespace
    when 'Api::V1'
      user ? client_rules : guest_user_rules
    end
  end

  def client_rules
    can :create, Offercode
    can :read, Offer
    can :read, Restaurant
    can :read, Star
    can :activate, :starcode
    can :read, Starcode
  end

  def guest_user_rules
    can :read, Offer
    can :read, Restaurant
    can :read, Starcode
  end
end
