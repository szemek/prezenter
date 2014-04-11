class Presentation
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, type: String
  field :username, type: String
  field :html, type: String
  field :css, type: String
  field :haml, type: String
  field :sass, type: String
end
