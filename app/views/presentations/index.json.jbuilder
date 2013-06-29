json.array!(@slides) do |slide|
  json.extract! slide, :name, :username, :html, :css, :haml, :sass
  json.url slide_url(slide, format: :json)
end
