class SyncController < WebsocketRails::BaseController
  def connected
    send_message :connected, { message: "Hello :)" }
  end
end
