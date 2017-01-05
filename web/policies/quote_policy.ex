defmodule Pomerol.QuotePolicy do
  import Pomerol.Helpers.Policy, only: [get_membership: 2, get_role: 1, author_or_higher?: 1]

  alias Pomerol.{Quote, User}
  alias Ecto.Changeset

  def create?(%User{admin: true}, %Quote{}), do: true
  def create?(%User{admin: true}, %Changeset{}), do: true
  def create?(%User{} = user, %Quote{} = quote), do: quote |> get_membership(user) |> get_role |> author_or_higher?
  def create?(%User{} = user, %Changeset{} = changeset), do: changeset |> get_membership(user) |> get_role |> author_or_higher?

end
