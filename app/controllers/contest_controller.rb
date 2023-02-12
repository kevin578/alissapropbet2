class ContestController < ApplicationController

  before_action :must_be_logged_in
  skip_before_action :must_be_logged_in, only: [:enter, :live]

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
    case @contest.status
      when "draft"
        render 'contest/edit'
      when "enterable"
        render 'contest/edit_enterable'
      when "live"
        render 'contest/edit'
      when "finished"
        render 'contest/edit'
      end
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

  def preview
    if UserContest.where(user_id: current_user.id, contest_id: params[:id]).empty?
      redirect_to '/'
    end
    @contest = Contest.find(params[:id])
  end

  def enter
    contests = Contest.where(id: params[:id], status: :enterable)
    if contests.empty?
      redirect_to '/'
    end
    @contest = contests.first
  end

  def live
    contests = Contest.where(id: params[:id]) 
    if contests.empty?
      redirect_to '/'
    else
      @contest = contests.first
    end
  end
end
