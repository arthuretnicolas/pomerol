defmodule Pomerol.ContactPolicy do
  import Pomerol.Helpers.Policy, only: [get_membership: 2, get_role: 1, author_or_higher?: 1]

  alias Pomerol.{Contact, User}
  alias Ecto.Changeset

  def show?(%User{admin: true}, %Contact{}), do: true
  def show?(%User{} = user, %Contact{} = contact), do: contact |> get_membership(user) |> get_role |> author_or_higher?

  def update?(%User{admin: true}, %Contact{}), do: true
  def update?(%User{} = user, %Contact{} = contact), do: contact |> get_membership(user) |> get_role |> author_or_higher?

  def create?(%User{admin: true}, %Contact{}), do: true
  def create?(%User{admin: true}, %Changeset{}), do: true
  def create?(%User{} = user, %Contact{} = contact), do: contact |> get_membership(user) |> get_role |> author_or_higher?
  def create?(%User{} = user, %Changeset{} = changeset), do: changeset |> get_membership(user) |> get_role |> author_or_higher?

  def delete?(%User{admin: true}, %Contact{}), do: true
  def delete?(%User{} = user, %Contact{} = contact), do: contact |> get_membership(user) |> get_role |> author_or_higher?

end
