class Contest < ApplicationRecord
  belongs_to :user
  validates :name, presence: true
  validates :status, presence: true
  enum :status, [:draft, :enterable, :live, :finished]

  has_many :user_contests
  has_many :users, through: :user_contests
  has_many :entries

  after_create :create_user_contest

  def create_user_contest
    UserContest.create(user_id: user.id, contest_id: id)
  end

  def shared_with(user_id) 
    user_contests = UserContest.where.not(user_id: user_id).where(contest_id: id)
    user_contests.map do |uc|
      User.find(uc.user_id)
    end
  end

  def points_by_id(id)
    id_arr = id.split('_')
    raise StandardError, "Invalid id passed to points_by_id" if id_arr.length != 4
    prop_index = id_arr[1].to_i
    option_index = id_arr[3].to_i
    props[prop_index]["options"][option_index]["points"].to_i
  end

  def prop_is_answered(index)
    prop_string = "prop_#{index}"    
    results.any? { |ca| ca.include?(prop_string) }
  end

  def standings
    entries.sort_by(&:points).reverse
  end

  def results
    self[:results] || []
  end
end
