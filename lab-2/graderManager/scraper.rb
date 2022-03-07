require 'httparty'
require 'byebug'


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
    puts courses
    puts sections 
    byebug
    
end 

scraper