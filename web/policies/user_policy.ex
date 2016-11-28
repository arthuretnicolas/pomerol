defmodule Pomerol.UserPolicy do
  alias Pomerol.User

  def update?(%User{} = user, %User{} = current_user), do: user.id == current_user.id
end
