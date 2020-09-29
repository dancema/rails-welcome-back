# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([( name: 'Star Wars' ), ( name: 'Lord of the Rings' )])
#   Character.create(name: 'Luke', movie: movies.first)

kali = Restaurant.create(name: 'Kali Greek Food', street: '1, rue montera', city: 'Paris', postal_code: 75012, website_url: 'hello.com')
elsy = Restaurant.create(name: 'Elsy', street: '1, rue montera', city: 'Paris', postal_code: 75012, website_url: 'hello.com')




Offer.create({ title: 'Bière Mythos', stars_required: 2, restaurant:kali})
Offer.create({ title: "Frites maison à l'origan", stars_required: 3, restaurant:kali})
Offer.create({ title: 'Souvlaki de poulet citronné', stars_required: 5, restaurant:kali})
Offer.create({ title: "Gyros ap'ola", stars_required: 6, restaurant:kali})
Offer.create({ title: 'Souvlaki de poulet citronné + Boisson + Dessert', stars_required: 9, restaurant:kali})
Offer.create({ title: '2 Gyros + 2 Boissons + 2 Desserts', stars_required: 12, restaurant:kali})

