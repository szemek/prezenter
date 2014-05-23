class PresentationsController < ApplicationController
  respond_to :html, :json

  before_action :set_presentation, only: [:edit, :show, :update, :destroy]
  before_action :authenticate_user!, only: [:create, :edit, :update, :destroy]

  def index
    @presentations = Presentation.order(:updated_at.desc)

    respond_with(@presentations)
  end

  def show
    respond_with(@presentation)
  end

  def edit
  end

  def create
    @presentation = Presentation.new(presentation_params)
    @presentation.username = current_user.login

    if @presentation.save
      redirect_to edit_presentation_path(@presentation), notice: 'Presentation was successfully created.'
    else
      render action: 'new'
    end
  end

  def update
    if @presentation.update_attributes(presentation_params)
      redirect_to edit_presentation_path(@presentation), notice: 'Presentation was successfully updated.'
    else
      render action: 'edit'
    end
  end

  def destroy
    @presentation.destroy
    redirect_to root_path
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_presentation
      @presentation = Presentation.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def presentation_params
      params.require(:presentation).permit(
        :name,
        :username,
        :html,
        :css,
        :haml,
        :sass,
        :duration
      )
    end
end
