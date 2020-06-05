class User < ApplicationRecord
  has_secure_password
  validates :email, uniqueness: { case_sensitive: false }, format: { with: URI::MailTo::EMAIL_REGEXP }, presence: true
  # validates :first_name, presence: true
  # validates :last_name, presence: true
  validates :password, presence: true
  attribute :wallet, :float, default: 5000.00

  has_many :stocks

  # has_secure_password
end
