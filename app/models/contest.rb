class Contest < ApplicationRecord
  belongs_to :user
  validates :name, presence: true
  validates :status, presence: true
  enum :status, [:draft, :active, :finished]

end
