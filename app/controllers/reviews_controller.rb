class ReviewsController < ApplicationController
        before_action :set_review, only: [:update, :destroy]
        # skip_before_action :authorize, only: :rating_filter

        # GET /reviews
        def index
          @reviews = Review.all
          render json: @reviews
        end
      
        # GET /reviews/1
        def show
          render json: @review
        end
      
        # POST /reviews
        def create
          @review = @current_user.reviews.create!(review_params)
         render json: @review
        end
      
        # PATCH/PUT /reviews/1
        def update
          if @review.update(review_params)
            render json: @review
          else
            render json: @review.errors, status: :unprocessable_entity
          end
        end
      
        # DELETE /reviews/1
        def destroy
          @review.destroy
          head :no_content
        end
      
        private
      
        def set_review
          @review = @current_user.reviews.find(params[:id])
        end
      
        def review_params
          params.permit(:rating, :content, :herb_id)
        end
end
