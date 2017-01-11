defmodule Pomerol.OrganizationTransactionalEmailPolicy do
  import Pomerol.Helpers.Policy, only: [get_membership: 2, get_role: 1, author_or_higher?: 1]

  alias Pomerol.{OrganizationTransactionalEmail, User}
  alias Ecto.Changeset

  def update?(%User{admin: true}, %Changeset{}), do: true
  def update?(%User{} = user, %Changeset{data: %OrganizationTransactionalEmail{} = organization_transactional_email} = changeset), do: organization_transactional_email |> get_membership(user) |> get_role |> author_or_higher?
  def update?(%User{}, %Changeset{}), do: false

end
