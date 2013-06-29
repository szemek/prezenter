class PrezenterController < ApplicationController
  before_action :set_presentation, only: [:prezent, :view]
  def prezent
    render layout: 'prezenter'
  end

  def view
    render layout: 'prezenter'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_presentation
      @presentation = Presentation.find(params[:id])
    end
end
