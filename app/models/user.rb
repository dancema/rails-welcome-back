class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  enum role: [:client, :admin, :restaurant]
  after_initialize :set_default_role, :if => :new_record?

  def set_default_role
    self.role ||= :client
  end

  has_many :codes
  has_many :stars
  has_many :restaurants
end
