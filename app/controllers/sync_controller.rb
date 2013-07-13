class SyncController < WebsocketRails::BaseController
  def client_connected
    send_message :connected, { message: "Hello world!" }
  end

  def change_slide
  end

  def update_slide
  end

  def client_disconnected
  end
end
