defmodule Pomerol.NotificationEmailPolicy do

  import Pomerol.Helpers.Policy, only: [get_membership: 2, get_role: 1, author_or_higher?: 1]

  alias Pomerol.NotificationEmail
  alias Pomerol.User
  alias Ecto.Changeset

  def create?(%User{admin: true}, %Changeset{}), do: true
  def create?(%User{} = user, %Changeset{} = changeset) do
    changeset |> get_membership(user) |> get_role |> author_or_higher?
  end

  def update?(%User{admin: true}, %NotificationEmail{}), do: true
  def update?(%User{} = user, %NotificationEmail{} = notification_email) do
    notification_email |> get_membership(user) |> get_role |> author_or_higher?
  end

  def delete?(%User{admin: true}, %NotificationEmail{}), do: true
  def delete?(%User{} = user, %NotificationEmail{} = notification_email) do
    notification_email |> get_membership(user) |> get_role |> author_or_higher?
  end
end
