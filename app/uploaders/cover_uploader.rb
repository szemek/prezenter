# encoding: utf-8

class CoverUploader < CarrierWave::Uploader::Base
  include Cloudinary::CarrierWave

  version :thumb do
    process resize_to_limit: [300, 200]
  end
end
