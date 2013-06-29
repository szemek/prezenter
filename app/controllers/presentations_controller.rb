class PresentationsController < ApplicationController
  before_action :set_presentation, only: [:show, :edit, :update, :destroy]

  def index
    @presentations = Presentation.all
  end

  def show
  end

  def new
    @presentation = Presentation.new
  end

  def edit
  end

  def create
    @presentation = Presentation.new(presentation_params)
    @presentation.username = current_user.login

    respond_to do |format|
      if @presentation.save
        format.html { redirect_to edit_presentation_path(@presentation), notice: 'Presentation was successfully created.' }
        format.json { render action: 'show', status: :created, location: @presentation }
      else
        format.html { render action: 'new' }
        format.json { render json: @presentation.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @presentation.update_attributes(presentation_params)
        puts "First"
        format.html { redirect_to edit_presentation_path(@presentation), notice: 'Presentation was successfully updated.' }
        format.json { head :no_content }
      else
        puts "Second"
        format.html { render action: 'edit' }
        format.json { render json: @presentation.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @presentation.destroy
    respond_to do |format|
      format.html { redirect_to root_path }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_presentation
      @presentation = Presentation.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def presentation_params
      params.require(:presentation).permit(:name, :username, :html, :css, :haml, :sass)
    end
end
