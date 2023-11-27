class HerbsController < ApplicationController
    skip_before_action :authorize, only: :index
    
    # GET /herbs
    def index
        render json: Herb.all
    end

    # POST /herbs
    def create
      herb = Herb.create(herb_params)
      render json:herb, status: :created
    end

    private

    def herb_params
      params.permit(:name, :description, :image)
    end
end
