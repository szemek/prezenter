class SlidesController < ApplicationController
  before_action :set_slides, only: [:show, :edit, :update, :destroy]

  # GET /slides
  # GET /slides.json
  def index
    @slides = Slides.all
  end

  # GET /slides/1
  # GET /slides/1.json
  def show
  end

  # GET /slides/new
  def new
    @slides = Slides.new
  end

  # GET /slides/1/edit
  def edit
  end

  # POST /slides
  # POST /slides.json
  def create
    @slides = Slides.new(slide_params)
    @slides.login = current_user.login

    respond_to do |format|
      if @slides.save
        format.html { redirect_to edit_slid@slides, notice: 'Slides was successfully created.' }
        format.json { render action: 'show', status: :created, location: @slides }
      else
        format.html { render action: 'new' }
        format.json { render json: @slides.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /slides/1
  # PATCH/PUT /slides/1.json
  def update
    respond_to do |format|
      if @slides.update(slide_params)
        format.html { redirect_to @slides, notice: 'Slides was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @slides.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /slides/1
  # DELETE /slides/1.json
  def destroy
    @slides.destroy
    respond_to do |format|
      format.html { redirect_to slides_path }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_slides
      @slides = Slides.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def slide_params
      params.require(:slides).permit(:name, :username, :html, :css, :haml, :sass)
    end
end
