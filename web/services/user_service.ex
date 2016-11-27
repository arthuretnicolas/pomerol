defmodule Pomerol.UserService do
  use Pomerol.Web, :service

  alias Pomerol.{Repo, User, Organization, OrganizationMembership, Mailer, Email}

  def insert(conn, changeset, params, locale) do
    Multi.new
    |> Multi.insert(:user, changeset)
    |> Multi.run(:insert_organization, &(insert_organization(params["organization_name"], &1[:user])))
    |> Multi.run(:send_welcome_email, &(send_welcome_email(conn, params, &1[:user])))
  end

  def insert_organization(organization_name, user) do
    organization_changeset = %Pomerol.Organization{name: organization_name}
    organization = Repo.insert!(organization_changeset)

    organization
      |> build_assoc(:organization_memberships)
      |> OrganizationMembership.create_changeset(%{member_id: user.id, role: "owner"})
      |> Repo.insert!
    {:ok, organization}
  end

  def password_reset_request(conn, email) do
    case Repo.get_by(User, email: String.downcase(email)) do
      nil -> {:error, :not_found}
      user ->
          user
          |> User.password_reset_request_changeset
          |> Repo.update!
          |> send_password_reset_request_email
          {:ok, user}
    end
  end

  def password_reset(conn, token, password) do
    case user_for_password_token(token) do
      nil -> {:error, :not_found}
      user = %User{} ->
              user
              |> User.password_reset_changeset(%{password: password})
              |> Repo.update!
              |> send_password_reset_email
              {:ok, user}
    end
  end

  defp user_for_password_token(token) do
    query = from u in User,
            where: u.password_reset_token == ^token
              and u.password_reset_timestamp > fragment("now() - interval '48hours'"),
            select: u
    Repo.one(query)
  end

  def send_welcome_email(conn, params, user) do
    user
    |> Email.welcome_email
    |> Mailer.deliver_later
    {:ok, conn}
  end

  def send_password_reset_request_email(user) do
    user
    |> Email.password_reset_request_email
    |> Mailer.deliver_later
  end

  def send_password_reset_email(user) do
    user
    |> Email.password_reset_email
    |> Mailer.deliver_later
  end
end
