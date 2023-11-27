class AddDescriptionAndImageToHerbs < ActiveRecord::Migration[7.0]
  def change
    add_column :herbs, :description, :text
    add_column :herbs, :image, :string
  end
end
