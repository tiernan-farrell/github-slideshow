class CreateCourses < ActiveRecord::Migration[6.1]
  def change
    create_table :courses do |t|
      t.integer :courseNo
      t.string :title
      t.string :description

      t.timestamps
    end
  end
end
