class Presentation
  include Mongoid::Document
  include Mongoid::Timestamps
  include Mongoid::Slug

  field :name, type: String
  slug :name
  field :username, type: String
  field :html, type: String
  field :css, type: String
  field :haml, type: String
  field :sass, type: String
end
