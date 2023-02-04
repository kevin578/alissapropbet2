class ContestController < ApplicationController

  before_action :must_be_logged_in

  def create
    contest = Contest.create({
      user_id: current_user.id,
      name: 'New Contest',
      status: :draft
    })
    redirect_to "/contest/#{contest.id}/edit"
  end

  def edit
    contest = current_user.contests.where(id: params[:id])
    redirect_to '/' if contest.empty?
    @contest = contest.first
  end

  def update
    contest = Contest.find(params["id"])
    body = JSON.parse(request.raw_post)
    res = contest.update({
      name: body["name"],
      status: body["status"],
      props: body["props"]
    })
    render json: res
  end
  
  def destroy
    Contest.find(params[:id]).destroy
    redirect_to '/user/profile' 
  end

  def add_user
    email = JSON.parse(request.raw_post)["email"]
    contest_id = JSON.parse(request.raw_post)["contestId"]
    user = User.where(email: email)
    if (user.empty?)
      ret = {success: false, msg: "Could not find user with email #{email}"}
    else
      UserContest.create(user_id: user.first.id, contest_id: contest_id)
      ret = {success: true}
    end
    render json: ret 
  end

  def remove_user
    user_id = JSON.parse(request.raw_post)["id"]
    contest_id = JSON.parse(request.raw_post)["contestId"]
    uc = UserContest.where(user_id: user_id, contest_id: contest_id)
    uc.first.destroy
    render json: {success: true}
  end
end
