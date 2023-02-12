class Entry < ApplicationRecord
  belongs_to :contest

  def points
    correct_answers.reduce(0) { |total_points, id| total_points + contest.points_by_id(id) }
  end

  def correct_answers
    contest.results & selected_options
  end

  def got_prop_correct(index)
    prop_string = "prop_#{index}"    
    correct_answers.any? { |ca| ca.include?(prop_string) }
  end

  def option_is_correct(id)
    correct_answers.include?(id)
  end
end
