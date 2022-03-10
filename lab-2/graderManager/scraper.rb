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

courses, sections = scraper 

db = SQLite3::Database.new('graderManager.db') 
db.execute "CREATE TABLE IF NOT EXISTS users(username TEXT, password TEXT, userType TEXT)"
db.execute "CREATE TABLE IF NOT EXISTS courses(courseNo INT, title TEXT, description TEXT)"
db.execute "CREATE TABLE IF NOT EXISTS sections(sectionNo TEXT, courseNo INT)"

courses.each {|course| 
    db.execute "INSERT INTO courses (courseNo, title, description) VALUES (?, ?, ?)", course['catalogNumber'], course['title'], course['description']
}

sections.each {|section| 
    section.each {|s|
        db.execute "INSERT INTO sections (sectionNo, courseNo) VALUES (?, ?)", s['section'], s['catalogNumber']
    }
}