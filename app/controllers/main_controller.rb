class MainController < ActionController::Base
  def index
    render layout: true, content_type: 'text/html'
  end
end
