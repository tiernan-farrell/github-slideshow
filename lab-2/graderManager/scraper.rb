require 'httparty'
require 'byebug'
require 'sqlite3'

def scraper 
    url = "https://content.osu.edu/v2/classes/search?q=cse&campus=col&p=1&term=1222"
    p = HTTParty.get(url)
    totalItems = p['data'].first[1]
    courses = Array.new
    sections = Array.new
    pd = p['data']['courses']
    pd.each {|single| courses << single['course']
        sections << single['sections']
    }
    
    return courses, sections
    
    
end 

c, s = scraper 

db = SQLite3::Database.new('./db/development.sqlite3') 

c.each {|course| 
    db.execute "INSERT INTO courses (courseNo, title, description) VALUES (?, ?, ?)", course['catalogNumber'], course['title'], course['description']
}

s.each {|section| 
    section.each {|ss|
        db.execute "INSERT INTO sections (sectionNo, courseNo) VALUES (?, ?)", ss['section'], ss['catalogNumber']
    }
}