# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_10_31_133711) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "batches", force: :cascade do |t|
    t.string "name"
  end

  create_table "offercodes", force: :cascade do |t|
    t.bigint "offer_id"
    t.bigint "user_id"
    t.string "status"
    t.string "code"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.datetime "scanned_at"
    t.index ["offer_id"], name: "index_offercodes_on_offer_id"
    t.index ["user_id"], name: "index_offercodes_on_user_id"
  end

  create_table "offers", force: :cascade do |t|
    t.string "title"
    t.bigint "restaurant_id"
    t.string "offer_type"
    t.integer "stars_required"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["restaurant_id"], name: "index_offers_on_restaurant_id"
  end

  create_table "restaurants", force: :cascade do |t|
    t.string "name"
    t.string "street"
    t.string "city"
    t.string "postal_code"
    t.string "website_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_restaurants_on_user_id"
  end

  create_table "starcodes", force: :cascade do |t|
    t.string "status"
    t.datetime "scanned_at"
    t.string "code"
    t.bigint "batch_id"
    t.index ["batch_id"], name: "index_starcodes_on_batch_id"
  end

  create_table "stars", force: :cascade do |t|
    t.bigint "restaurant_id"
    t.bigint "user_id"
    t.string "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "offercode_id"
    t.bigint "starcode_id"
    t.index ["offercode_id"], name: "index_stars_on_offercode_id"
    t.index ["restaurant_id"], name: "index_stars_on_restaurant_id"
    t.index ["starcode_id"], name: "index_stars_on_starcode_id"
    t.index ["user_id"], name: "index_stars_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "role"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "offercodes", "offers"
  add_foreign_key "offercodes", "users"
  add_foreign_key "offers", "restaurants"
  add_foreign_key "restaurants", "users"
  add_foreign_key "starcodes", "batches"
  add_foreign_key "stars", "offercodes"
  add_foreign_key "stars", "restaurants"
  add_foreign_key "stars", "starcodes"
end
