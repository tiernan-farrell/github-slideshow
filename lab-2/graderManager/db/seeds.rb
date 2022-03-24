# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'httparty'
require 'byebug'
require 'sqlite3'



url = "https://content.osu.edu/v2/classes/search?q=cse&campus=col&p=1&term=1222"
p = HTTParty.get(url)
totalItems = p['data'].first[1]
courses = Array.new
sections = Array.new
pd = p['data']['courses']
pd.each {|single| courses << single['course']
    sections << single['sections']
}

courses.each {|c|
    puts c 
    Course.create(courseNo: c['catalogNumber'], title:c['title'], description: c['description'])
}

sections.each { |section|
    section.each { |ss| 
        puts ss
        Section.create(sectionNo: ss['section'], courseNo: ss['catalogNumber'])
    }
}