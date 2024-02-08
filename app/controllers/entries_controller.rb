class EntriesController < ApplicationController

  def show
    entries = Entry.where(id: params[:id])
    redirect_to '/' if entries.empty?
    @entry = entries.first
    @contest = @entry.contest
    redirect_to '/' unless can_see_entry
  end

  def create
    if Entry.where(contest_id: params['contestId'], name: params['name']).empty?
      Entry.create(name: params["name"], contest_id: params['contestId'], selected_options: params['checkedIds'])
      ret = {success: true}
    else
      ret = {success: false, msg: "The name '#{params["name"]}' is already being used in this contest"}
    end
    render json: ret
  end

  def can_see_entry
    return true if @contest.live? || @contest.finished?
    return false if !current_user
    UserContest.where(user_id: current_user.id, contest_id: @contest.id).present?
  end
end
