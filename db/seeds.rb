# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([( name: 'Star Wars' ), ( name: 'Lord of the Rings' )])
#   Character.create(name: 'Luke', movie: movies.first)


User.create(email:"client@client.fr",password:"hellohello", role:"client")
User.create(email:"admin@admin.fr",password:"hellohello", role:"admin")
restaurant_user = User.create(email:"restaurant@restaurant.fr",password:"hellohello", role:"restaurant")
restaurant_user2 = User.create(email:"restaurant2@restaurant.fr",password:"hellohello", role:"restaurant")


kali = Restaurant.create(name: 'Kali Greek Food', street: '1, rue montera', city: 'Paris', postal_code: 75012, website_url: 'hello.com', user: restaurant_user)
elsy = Restaurant.create(name: 'Elsy', street: '1, rue montera', city: 'Paris', postal_code: 75012, website_url: 'hello.com', user: restaurant_user2)


Offer.create({ title: 'Bière Mythos', stars_required: 0, restaurant:kali, offer_type: "exclusive-deal"})
Offer.create({ title: "Frites maison à l'origan", stars_required: 3, restaurant:kali, offer_type: "loyalty"})
Offer.create({ title: 'Souvlaki de poulet citronné', stars_required: 5, restaurant:kali, offer_type: "loyalty"})
Offer.create({ title: "Gyros ap'ola", stars_required: 6, restaurant:kali, offer_type: "loyalty"})
Offer.create({ title: 'Souvlaki de poulet citronné + Boisson + Dessert', stars_required: 9, restaurant:kali, offer_type: "loyalty"})
Offer.create({ title: '2 Gyros + 2 Boissons + 2 Desserts', stars_required: 12, restaurant:kali, offer_type: "loyalty"})


Offer.create({ title: 'Bière Mythos', stars_required: 0, restaurant:elsy, offer_type: "exclusive-deal"})
Offer.create({ title: "Frites maison à l'origan", stars_required: 3, restaurant:elsy, offer_type: "loyalty"})
Offer.create({ title: 'Souvlaki de poulet citronné', stars_required: 5, restaurant:elsy, offer_type: "loyalty"})
Offer.create({ title: "Gyros ap'ola", stars_required: 6, restaurant:elsy, offer_type: "loyalty"})
Offer.create({ title: 'Souvlaki de poulet citronné + Boisson + Dessert', stars_required: 9, restaurant:elsy, offer_type: "loyalty"})
Offer.create({ title: '2 Gyros + 2 Boissons + 2 Desserts', stars_required: 12, restaurant:elsy, offer_type: "loyalty"})


batch = Batch.create(name: "test")

starcode = Starcode.create(code: "00000000", scanned_at: nil, status: "valid", batch: batch)
Star.create(restaurant: kali, status: "valid", starcode: starcode)

starcode = Starcode.create(code: "11111111", scanned_at: nil, status: "valid", batch: batch)
Star.create(restaurant: kali, status: "valid", starcode: starcode)

starcode = Starcode.create(code: "22222222", scanned_at: nil, status: "valid", batch: batch)
Star.create(restaurant: kali, status: "valid", starcode: starcode)

starcode = Starcode.create(code: "33333333", scanned_at: nil, status: "valid", batch: batch)
Star.create(restaurant: kali, status: "valid", starcode: starcode)

starcode = Starcode.create(code: "44444444", scanned_at: nil, status: "valid", batch: batch)
Star.create(restaurant: kali, status: "valid", starcode: starcode)

starcode = Starcode.create(code: "55555555", scanned_at: nil, status: "valid", batch: batch)
Star.create(restaurant: kali, status: "valid", starcode: starcode)

starcode = Starcode.create(code: "66666666", scanned_at: nil, status: "valid", batch: batch)
Star.create(restaurant: kali, status: "valid", starcode: starcode)

starcode = Starcode.create(code: "77777777", scanned_at: nil, status: "valid", batch: batch)
Star.create(restaurant: kali, status: "valid", starcode: starcode)

starcode = Starcode.create(code: "88888888", scanned_at: nil, status: "valid", batch: batch)
Star.create(restaurant: kali, status: "valid", starcode: starcode)

starcode = Starcode.create(code: "99999999", scanned_at: nil, status: "valid", batch: batch)
Star.create(restaurant: kali, status: "valid", starcode: starcode)
