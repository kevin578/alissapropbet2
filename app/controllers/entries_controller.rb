class EntriesController < ApplicationController
  def create
    if Entry.where(contest_id: params['contestId'], name: params['name']).empty?
      Entry.create(name: params["name"], contest_id: params['contestId'], selected_options: params['checkedIds'])
      ret = {success: true}
    else
      ret = {success: false, msg: "The name '#{params["name"]}' is already being used in this contest"}
    end
    render json: ret
  end
end
