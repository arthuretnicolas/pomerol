defmodule Canary.Abilities do
  alias Pomerol.User
  alias Pomerol.Organization
  alias Pomerol.OrganizationMembership

  alias Pomerol.UserPolicy
  alias Pomerol.OrganizationPolicy
  alias Pomerol.OrganizationMembershipPolicy

  alias Ecto.Changeset

  defimpl Canada.Can, for: User do
    # NOTE: Canary sets an :unauthorized and a :not_found handler on a config level
    # The problem is, it will still go through the authorization process first and only call the
    # not found handler after the unauthorized handler does its thing. This means that our
    # unauthorized handler will halt the connection and respond, so the not_found handler
    # will never do anything
    #
    # The only solution is to have a catch_all match for the resource being nil, which returns true
    def can?(%User{}, _action, nil), do: true

    def can?(%User{} = current_user, :update, %User{} = user), do: UserPolicy.update?(user, current_user)

    def can?(%User{} = user, :create, Organization), do: OrganizationPolicy.create?(user)
    def can?(%User{} = user, :update, %Organization{} = organization), do: OrganizationPolicy.update?(user, organization)

    def can?(%User{} = user, :create, %Changeset{data: %OrganizationMembership{}} = changeset), do: OrganizationMembershipPolicy.create?(user, changeset)
    def can?(%User{} = user, :update, %Changeset{data: %OrganizationMembership{}} = changeset), do: OrganizationMembershipPolicy.update?(user, changeset)
    def can?(%User{} = user, :delete, %OrganizationMembership{} = membership), do: OrganizationMembershipPolicy.delete?(user, membership)

  end
end
