class CreateSupportTickets < ActiveRecord::Migration
  def change
    create_table :support_tickets do |t|
      t.string :endpoint
      t.string :product_id

      t.timestamps
    end
  end
end
