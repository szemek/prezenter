class User
  include Mongoid::Document
  devise :database_authenticatable, :registerable

  ## Database authenticatable
  field :login,              :type => String, :default => ""
  field :encrypted_password, :type => String, :default => ""
end
