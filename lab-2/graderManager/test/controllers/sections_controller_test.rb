require "test_helper"

class SectionsControllerTest < ActionDispatch::IntegrationTest
  test "should get catalog" do
    get sections_catalog_url
    assert_response :success
  end
end
