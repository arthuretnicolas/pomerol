defmodule Canary.Abilities do
  alias Pomerol.User
  alias Pomerol.Organization
  alias Pomerol.OrganizationMembership
  alias Pomerol.OrganizationInvite
  alias Pomerol.Contact
  alias Pomerol.Quote

  alias Pomerol.UserPolicy
  alias Pomerol.OrganizationPolicy
  alias Pomerol.OrganizationMembershipPolicy
  alias Pomerol.OrganizationInvitePolicy
  alias Pomerol.ContactPolicy
  alias Pomerol.QuotePolicy

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

    def can?(%User{} = user, :update, %Changeset{data: %User{}} = changeset), do: UserPolicy.update?(user, changeset)

    def can?(%User{} = user, :show, %Organization{} = organization), do: OrganizationPolicy.show?(user, organization)
    def can?(%User{} = user, :index, %Organization{} = organization), do: OrganizationPolicy.show?(user, organization)
    def can?(%User{} = user, :create, Organization), do: OrganizationPolicy.create?(user)

    def can?(%User{} = user, :create, %Changeset{data: %OrganizationMembership{}} = changeset), do: OrganizationMembershipPolicy.create?(user, changeset)
    def can?(%User{} = user, :update, %Changeset{data: %OrganizationMembership{}} = changeset), do: OrganizationMembershipPolicy.update?(user, changeset)
    def can?(%User{} = user, :delete, %OrganizationMembership{} = membership), do: OrganizationMembershipPolicy.delete?(user, membership)

    def can?(%User{} = user, :create, %Changeset{data: %OrganizationInvite{}} = changeset), do: OrganizationInvitePolicy.create?(user, changeset)
    def can?(%User{} = user, :update, %OrganizationInvite{} = organization_invite), do: OrganizationInvitePolicy.update?(user, organization_invite)
    def can?(%User{} = user, :delete, %OrganizationInvite{} = organization_invite), do: OrganizationInvitePolicy.delete?(user, organization_invite)

    def can?(%User{} = user, :create, %Changeset{data: %Quote{}} = changeset), do: QuotePolicy.create?(user, changeset)

    def can?(%User{} = user, :create, %Changeset{data: %Contact{}} = changeset), do: ContactPolicy.create?(user, changeset)
    def can?(%User{} = user, :show, %Contact{} = contact), do: ContactPolicy.show?(user, contact)
    def can?(%User{} = user, :create, %Contact{} = contact), do: ContactPolicy.create?(user, contact)
    def can?(%User{} = user, :update, %Contact{} = contact), do: ContactPolicy.update?(user, contact)

  end
end
