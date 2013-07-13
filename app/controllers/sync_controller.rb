class SyncController < WebsocketRails::BaseController
  def change
    broadcast_message :update, message
  end
end
