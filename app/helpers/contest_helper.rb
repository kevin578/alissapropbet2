module ContestHelper
  def get_status_text(status)
    case status
      when "draft"
        "Make contest enterable. Contestants will be able to enter, and you will no longer be able to edit the contest."       
      when "enterable"
        "Make contest live. No more entries will be allowed, and you will be able to input results" 
      else 
        'No text yet'
      end

  end
end
