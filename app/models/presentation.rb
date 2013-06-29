class Presentation
  include Mongoid::Document
  store_in collection: "slides"

  field :name, type: String
  field :username, type: String
  field :html, type: String
  field :css, type: String
  field :haml, type: String
  field :sass, type: String
end
