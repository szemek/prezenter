class PrezenterController < ApplicationController
  def show
    @presentation = Presentation.find(params[:id])
    render layout: 'prezenter'
  end
end
