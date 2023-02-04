class Contest < ApplicationRecord
  belongs_to :user
  validates :name, presence: true
  validates :status, presence: true
  enum :status, [:draft, :active, :finished]

  has_many :user_contests
  has_many :users, through: :user_contests
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
end
