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

  def get_prop_color(contest, entry, prop_index)
    default_color = 'gray-800'
    return default_color if contest.draft? || contest.enterable? || !contest.prop_is_answered(prop_index) || entry.nil?
    if entry.got_prop_correct(prop_index)
      "green-600"
    else
      "red-600"
    end
  end

  def get_option_color(contest, id)
    default_color = 'gray-800'
    return default_color if contest.draft? || contest.enterable?
    return "green-600" if contest.results.include?(id)
    default_color
  end
end
