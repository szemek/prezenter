class Image
  include Mongoid::Document
  include Mongoid::Timestamps

  field :raw, type: String
  mount_uploader :raw, ImageUploader
end
