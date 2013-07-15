class SyncController < ApplicationController
  include ActionController::Live

  def change
    $cache.write('hash', params[:hash])
    render nothing: true
  end

  def update
    hash = $cache.read('hash')
    response.headers['Content-Type'] = 'text/event-stream'
    response.stream.write "data: #{hash}\n\n"
    response.stream.close
  end
end
