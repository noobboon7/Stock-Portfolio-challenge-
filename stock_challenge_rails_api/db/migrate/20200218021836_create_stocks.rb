class CreateStocks < ActiveRecord::Migration[6.0]
  def change
    create_table :stocks do |t|
      t.string :symbol
      t.integer :quantity
      t.float :price
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
