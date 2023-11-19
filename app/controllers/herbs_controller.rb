class HerbsController < ApplicationController
    skip_before_action :authorize, only: :index
    
    def index
        render json: Herb.all
      end
end
